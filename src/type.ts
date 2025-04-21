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

export interface IBoardTask {
    assignee: {
        avatarUrl: string;
        email: string;
        fullName: string;
        id: number;
    };
    description: string;
    id: number;
    priority: string;
    status: string;
    title: string;
}

export interface ITask {
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

export interface ITaskUpdate {
    assigneeId: number;
    description: string;
    priority: string;
    status: string;
    title: string;
}

export interface ITaskCreate {
    assigneeId: number;
    boardId: number;
    description: string;
    priority: string;
    title: string;
}

export interface IUsers {
    avatarUrl: string;
    description: string;
    email: string;
    fullName: string;
    id: number;
    tasksCount: number;
    teamId: number;
    teamName: string;
}
