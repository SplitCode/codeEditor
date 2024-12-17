export enum TASKS {
    javascriptTask = 'javascriptTask',
    pythonTask = 'pythonTask',
}

export const TASKS_DETAILS = {
    [TASKS.javascriptTask]: {
        title: 'Задача на JavaScript',
        description:
            'Напишите функцию, которая выводит в консоль "Hello world!"',
    },
    [TASKS.pythonTask]: {
        title: 'Задача на Python',
        description:
            'Напишите программу, которая выводит "Hello world!" на Python.',
    },
};
