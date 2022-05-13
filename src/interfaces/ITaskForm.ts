import IProjectForm from "./IProjectForm";

export default interface ITaskform {
    timeInSeconds: number;
    description: string;
    project: IProjectForm;
}