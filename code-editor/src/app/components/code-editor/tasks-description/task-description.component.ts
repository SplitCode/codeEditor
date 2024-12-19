import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/models/task-interface';
import { TuiMarkerIconModule } from '@taiga-ui/kit';

@Component({
    selector: 'app-task-description',
    standalone: true,
    imports: [CommonModule, TuiMarkerIconModule],
    templateUrl: './task-description.component.html',
    styleUrl: './task-description.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDescriptionComponent {
    @Input() currentTask: Task | null = null;
}
