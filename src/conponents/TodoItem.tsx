import type { Todo } from '../type/type';

type Props = {
    todo: Todo;
    editingId: number | null;
    editingText: string;
    onToggle: (id: number) => void;
    onDelete: (id: number, text: string) => void;
    onEdit: (id: number, text: string) => void;
    onSave: (id: number) => void;
    onChangeEditingText: (text: string) => void;
};

export function TodoItem({
    todo,
    editingId,
    editingText,
    onToggle,
    onDelete,
    onEdit,
    onSave,
    onChangeEditingText,
}: Props) {
    return (
        <li
            className={`mb-2 flex h-16 items-center gap-1 rounded px-2 py-2 shadow ${
                todo.completed ? 'border border-green-300 bg-green-50' : 'bg-white'
            }`}
        >
            <input
                type="checkbox"
                className="mx-2 h-5 w-5"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />

            <div className="flex-1">
                {editingId === todo.id ? (
                    <input
                        value={editingText}
                        maxLength={24}
                        onChange={(e) => onChangeEditingText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && onSave(todo.id)}
                        className="h-7 w-full rounded border border-gray-300 focus:border-green-300 focus:outline-none"
                    />
                ) : (
                    <p className={todo.completed ? 'text-gray-500 line-through' : 'text-gray-800'}>
                        {todo.text}
                    </p>
                )}
            </div>

            {editingId === todo.id ? (
                <button
                    className="h-7 w-7 rounded bg-green-300 text-white"
                    onClick={() => onSave(todo.id)}
                >
                    ✓
                </button>
            ) : (
                <>
                    {!todo.completed && (
                        <button
                            className="h-7 w-7 cursor-pointer rounded bg-gray-300 shadow hover:bg-gray-500"
                            onClick={() => onEdit(todo.id, todo.text)}
                        >
                            ✏
                        </button>
                    )}
                    <button
                        className="h-7 w-7 cursor-pointer rounded bg-red-300 px-2 py-1 text-white shadow hover:bg-red-500"
                        onClick={() => onDelete(todo.id, todo.text)}
                    >
                        X
                    </button>
                </>
            )}
        </li>
    );
}
