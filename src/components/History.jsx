export default function History({accomplishTasks, onRestore}) {
    return(
        <div>
            <header>
                <h2 className="text-2xl font-bold text-stone-700 mb-4">Accomplished tasks</h2>
            </header>
            <section>
                {accomplishTasks.length === 0 && (
                    <p className="text-stone-800 my-4">
                        This project does not have any accomplished task
                    </p>
                )}
                {accomplishTasks.length > 0 && (
                    <ul className="p-4 mt-8 rounded-md bg-stone-100">
                        {accomplishTasks.map((task) => (
                            <li key={task.id} className="flex justify-between my-4">
                                <span className="line-through">{task.text}</span>
                                <button
                                    onClick={() => onRestore(task.id)}
                                    className="text-stone-700 hover:text-red-500"
                                >
                                    Restore
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}