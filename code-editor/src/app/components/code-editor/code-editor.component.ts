import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeEditorWindowComponent } from './code-editor-window/code-editor-window.component';
import { TaskDescriptionComponent } from './tasks-description/task-description.component';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task-interface';
import { map, Observable, tap } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { TuiLoaderModule } from '@taiga-ui/core';

@Component({
    selector: 'app-code-editor',
    standalone: true,
    imports: [
        CommonModule,
        CodeEditorWindowComponent,
        TaskDescriptionComponent,
        HeaderComponent,
        TuiLoaderModule,
    ],
    templateUrl: './code-editor.component.html',
    styleUrl: './code-editor.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeEditorComponent {
    private readonly taskService = inject(TaskService);
    readonly loading = signal(false);

    tasks$: Observable<Task[]> = this.taskService.getTasks().pipe(
        tap(() => this.loading.set(true)),
        tap((tasks) => {
            if (tasks.length > 0) {
                this.loading.set(false);
            }
        })
    );

    currentTask$: Observable<Task | null> = this.tasks$.pipe(
        map((tasks) => (tasks.length > 0 ? tasks[0] : null))
    );
}
