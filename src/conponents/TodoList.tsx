import type { Todo } from '../type/type';
import { TodoItem } from './TodoItem';

type Props = {
    todos: Todo[];
    editingId: number | null;
    editingText: string;
    onToggle: (id: number) => void;
    onDelete: (id: number, text: string) => void;
    onEdit: (id: number, text: string) => void;
    onSave: (id: number) => void;
    onChangeEditingText: (text: string) => void;
};

export function TodoList(props: Props) {
    return (
        <ul className="items-center justify-center py-3">
            {props.todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    editingId={props.editingId}
                    editingText={props.editingText}
                    onToggle={props.onToggle}
                    onDelete={props.onDelete}
                    onEdit={props.onEdit}
                    onSave={props.onSave}
                    onChangeEditingText={props.onChangeEditingText}
                />
            ))}
        </ul>
    );
}
