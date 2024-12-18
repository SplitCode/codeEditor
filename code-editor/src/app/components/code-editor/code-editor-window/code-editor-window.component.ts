import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    // Input,
    OnInit,
    signal,
    // SimpleChanges,
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
// import { Task } from 'src/app/models/task-interface';

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
export class CodeEditorWindowComponent implements OnInit {
    // @Input() currentTask: Task | null = null;

    private readonly taskService = inject(TaskService);
    private readonly cdr = inject(ChangeDetectorRef);
    readonly languages = ['javascript', 'python'];

    readonly loading = signal(false);

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

    ngOnInit() {
        this.languageControl.valueChanges.subscribe((language) => {
            this.editorOptions = { ...this.editorOptions, language };
        });
    }

    runCode() {
        this.loading.set(true);
        this.error = null;
        this.output = null;

        const language = this.languageControl.value;
        const code = this.code;

        if (language) {
            this.taskService
                .runCode(language, code)
                .subscribe(({ output, error }) => {
                    this.output = output;
                    this.error = error;
                    this.loading.set(false);

                    this.cdr.detectChanges();
                });
        }
    }
}
