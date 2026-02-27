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
				className="mx-2 size-6"
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
						className="h-8 w-full rounded border border-gray-300 focus:border-green-300 focus:outline-none font-zenmaru"
					/>
				) : (
					<p
						className={
							todo.completed
								? 'text-gray-500 line-through font-zenmaru'
								: 'text-gray-800 font-zenmaru'
						}
					>
						{todo.text}
					</p>
				)}
			</div>

			{editingId === todo.id ? (
				<button
					className="rounded bg-green-300 p-1 text-white"
					onClick={() => onSave(todo.id)}
					type="button"
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
							d="m4.5 12.75 6 6 9-13.5"
						/>
					</svg>
				</button>
			) : (
				<>
					{!todo.completed && (
						<button
							className="cursor-pointer rounded bg-gray-300 p-1 shadow hover:bg-gray-400"
							onClick={() => onEdit(todo.id, todo.text)}
							type="button"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								className="size-6 text-white"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
								/>
							</svg>
						</button>
					)}
					<button
						className="cursor-pointer rounded bg-red-300 p-1 shadow hover:bg-red-400"
						onClick={() => onDelete(todo.id, todo.text)}
						type="button"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							className="size-6 text-white"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M6 18 18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</>
			)}
		</li>
	);
}
