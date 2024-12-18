import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeEditorWindowComponent } from './code-editor-window/code-editor-window.component';
import { TaskDescriptionComponent } from './tasks-description/task-description.component';
import { TASK } from 'src/app/constants/tasks';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task-interface';

@Component({
    selector: 'app-code-editor',
    standalone: true,
    imports: [
        CommonModule,
        CodeEditorWindowComponent,
        TaskDescriptionComponent,
    ],
    templateUrl: './code-editor.component.html',
    styleUrl: './code-editor.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeEditorComponent {
    tasks: Task[] = [];
    currentTask: Task | null = null;

    private taskService = inject(TaskService);

    ngOnInit() {
        this.taskService.getTasks().subscribe((tasks) => {
            this.tasks = tasks;
            if (tasks.length) {
                this.currentTask = tasks[0];
            }
        });
    }

    selectTask(task: any) {
        this.currentTask = task;
    }
}
