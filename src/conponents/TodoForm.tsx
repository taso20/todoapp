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
                className="cursor-pointer rounded bg-blue-300 px-4 text-white shadow hover:bg-blue-400"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m11.99 7.5 3.75-3.75m0 0 3.75 3.75m-3.75-3.75v16.499H4.49"
                    />
                </svg>
            </button>
        </form>
    );
}
