import { useEffect, useState } from 'react';
import tasologo from './assets/taso20-512.png';
import { ShareButton } from './components/ShareButton';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import type { Todo } from './type/type';

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
        setTodos((prev) =>
            prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
        );

    const handleDelete = (id: number, text: string) => {
        if (window.confirm(`「${text}」削除してよろしいですか`)) {
            setTodos((prev) => prev.filter((t) => t.id !== id));
        }
    };

    const handleEdit = (id: number, text: string) => {
        setEditingId(id);
        setEditingText(text);
    };

    const handleSave = (id: number) => {
        if (!editingText.trim()) return setEditingId(null);
        setTodos((prev) =>
            prev.map((t) => (t.id === id ? { ...t, text: editingText } : t)),
        );
        setEditingId(null);
        setEditingText('');
    };

    return (
        <div className="h-screen bg-gray-50 overflow-hidden">
            <div className="mx-auto max-w-md">
                <header className="fixed left-0 top-0 w-full z-20">
                    <div className=" flex mx-auto max-w-md items-center justify-between rounded bg-blue-300">
                        <ShareButton></ShareButton>
                        <div>
                            <h1 className="text-4xl font-extrabold text-white font-mono">
                                todoso
                            </h1>
                        </div>
                        <img src={tasologo} alt="" className="m-3 size-14" />
                    </div>
                </header>

                <main className="overflow-scroll h-screen mt-20 pb-40 no-scrollbar">
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
                </main>
            </div>

            <footer>
                <div className="fixed bottom-0 left-0 w-full z-20 py-5">
                    <TodoForm input={input} onChange={setInput} onSubmit={handleSubmit} />
                </div>
            </footer>
        </div>
    );
}

export default App;
