import { useEffect, useState } from 'react';
import type { Todo } from './type/type';
import { TodoList } from './conponents/TodoList';
import { TodoForm } from './conponents/TodoForm';
import logo from './assets/taso20-512.png';
import { ShareButton } from './conponents/ShareButton';

function App() {
    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const saved = localStorage.getItem('todos');
            if (!saved) return [];
            const parsed = JSON.parse(saved);
            return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const [input, setInput] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
        setInput('');
    };

    const handleToggle = (id: number) =>
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

    const handleDelete = (id: number, text: string) => {
        if (window.confirm(`「${text}」削除してよいのだな`)) {
            setTodos((prev) => prev.filter((t) => t.id !== id));
        }
    };

    const handleEdit = (id: number, text: string) => {
        setEditingId(id);
        setEditingText(text);
    };

    const handleSave = (id: number) => {
        if (!editingText.trim()) return setEditingId(null);
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: editingText } : t)));
        setEditingId(null);
        setEditingText('');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-md">
                <div className="flex w-full items-center justify-between rounded bg-blue-300">
                    <ShareButton></ShareButton>
                    <h1 className="p-6 text-center text-3xl font-extrabold text-white">Todo-So</h1>
                    <img src={logo} alt="" className="m-3 h-14 w-14" />
                </div>

                <TodoList
                    todos={todos}
                    editingId={editingId}
                    editingText={editingText}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onSave={handleSave}
                    onChangeEditingText={setEditingText}
                />
            </div>

            <div className="fixed bottom-0 left-0 w-full py-10">
                <TodoForm input={input} onChange={setInput} onSubmit={handleSubmit} />
            </div>
        </div>
    );
}

export default App;
