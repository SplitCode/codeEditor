export enum Languages {
    Javascript = 'javascript',
    Python = 'python',
}

export const LanguageComments: Record<Languages, string> = {
    [Languages.Javascript]: '// Write your solution here',
    [Languages.Python]: '# Write your solution here',
};
