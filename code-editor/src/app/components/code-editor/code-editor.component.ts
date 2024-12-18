import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeEditorWindowComponent } from './code-editor-window/code-editor-window.component';
import { TaskDescriptionComponent } from './tasks-description/task-description.component';
import { TASK } from 'src/app/constants/tasks';

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
    currentTask = TASK;
}
