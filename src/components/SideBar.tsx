import { useState } from 'react';

export default function Sidebar() {
	const [open, setOpen] = useState(false);

	return (
		<>
			{/* ハンバーガー（モバイルのみ） */}
			<button
				className="m-2 rounded bg-blue-500 p-2 text-white shadow"
				onClick={() => setOpen(true)}
				type="button"
			>
				☰
			</button>

			{/* オーバーレイ（開いてる時だけ表示） */}
			{open && (
				<div
					className="bg-opacity-40 fixed inset-0 z-20 bg-black/40 backdrop-blur-sm"
					onClick={() => setOpen(false)}
				/>
			)}

			{/* サイドバー */}
			<aside
				className={`fixed top-0 left-0 z-30 h-full w-64 transform rounded bg-blue-300 p-4 text-white shadow transition-transform duration-300 md:static ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
			>
				<h2 className="mb-4 text-xl font-semibold">Menu</h2>
				<nav className="space-y-2">
					<a href="#" className="block rounded p-2 hover:bg-blue-400">
						Home
					</a>
					<a href="#" className="block rounded p-2 hover:bg-blue-400">
						Tasks
					</a>
					<a href="#" className="block rounded p-2 hover:bg-blue-400">
						Settings
					</a>
				</nav>

				{/* 閉じるボタン（モバイルのみ） */}
				<button
					className="mt-6 rounded bg-gray-300 p-2"
					onClick={() => setOpen(false)}
					type="button"
				>
					Close
				</button>
			</aside>
		</>
	);
}
