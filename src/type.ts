export interface IBoards {
    description: string;
    id: number;
    name: string;
    taskCount: number;
}

export interface IBoard {
    assignee: {
        avatarUrl: string;
        email: string;
        fullName: string;
        id: number;
    };
    boardId: number;
    boardName: string;
    description: string;
    id: number;
    priority: string;
    status: string;
    title: string;
}
