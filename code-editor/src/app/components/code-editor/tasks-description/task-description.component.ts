import {
    ChangeDetectionStrategy,
    Component,
    // EventEmitter,
    Input,
    // Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    // FormControl,
    // FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import {
    TuiTextfieldControllerModule,
    TuiDataListModule,
} from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';

@Component({
    selector: 'app-task-description',
    standalone: true,
    imports: [
        CommonModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
        TuiSelectModule,
        TuiTextfieldControllerModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './task-description.component.html',
    styleUrl: './task-description.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDescriptionComponent {
    @Input() title = '';
    @Input() description = '';
}

// @Input() tasks: any[] = [];
// @Output() taskSelected = new EventEmitter<any>();

// taskControl = new FormControl();
// formGroup = new FormGroup({
//     task: this.taskControl,
// });

// ngOnInit() {
//     this.taskControl.valueChanges.subscribe((task) => {
//         this.taskSelected.emit(task);
//     });
// }
