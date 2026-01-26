type Props = {
    input: string;
    onChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
};

export function TodoForm({ input, onChange, onSubmit }: Props) {
    return (
        <form className="mx-auto flex h-14 max-w-md gap-2 px-2" onSubmit={onSubmit}>
            <input
                value={input}
                maxLength={24}
                onChange={(e) => onChange(e.target.value)}
                type="text"
                className="flex-1 rounded border border-gray-300 bg-white px-2 py-1 focus:border-blue-300 focus:outline-none"
                placeholder="todo追加"
            />
            <button
                type="submit"
                className="w-14 cursor-pointer rounded bg-blue-300 px-3 text-white shadow hover:bg-blue-500"
            >
                追加
            </button>
        </form>
    );
}
