import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import {
    TuiButtonModule,
    TuiTextfieldControllerModule,
    TuiDataListModule,
} from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task-interface';

@Component({
    standalone: true,
    selector: 'app-code-editor-window',
    imports: [
        CommonModule,
        FormsModule,
        MonacoEditorModule,
        TuiButtonModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
        TuiSelectModule,
        ReactiveFormsModule,
        TuiTextfieldControllerModule,
    ],
    templateUrl: './code-editor-window.component.html',
    styleUrl: './code-editor-window.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeEditorWindowComponent implements OnInit, OnChanges {
    @Input() currentTask: Task | null = null;

    code = '// Write your solution here';
    output: string | null = null;
    error: string | null = null;

    languageControl = new FormControl<'javascript' | 'python'>('javascript');
    formGroup = new FormGroup({
        language: this.languageControl,
    });

    editorOptions = {
        theme: 'vs-dark',
        language: this.languageControl.value,
        automaticLayout: true,
    };

    constructor(private taskService: TaskService) {}
    readonly languages = ['javascript', 'python'];

    ngOnInit() {
        this.languageControl.valueChanges.subscribe((language) => {
            this.editorOptions = { ...this.editorOptions, language };
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['languageControl']) {
            this.editorOptions.language = this.languageControl.value;
        }
    }

    runCode() {
        this.error = null;
        this.output = null;

        if (!this.currentTask) {
            this.error = 'No task selected';
            return;
        }

        const language = this.languageControl.value;
        const code = this.code;

        if (language) {
            this.taskService
                .runCode(language, code)
                .subscribe(({ output, error }) => {
                    this.output = output;
                    this.error = error;
                });
        }
    }
}
