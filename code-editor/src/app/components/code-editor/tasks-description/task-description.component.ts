import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/models/task-interface';

@Component({
    selector: 'app-task-description',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './task-description.component.html',
    styleUrl: './task-description.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDescriptionComponent {
    @Input() currentTask!: Task;
}
