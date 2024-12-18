import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    OnInit,
    signal,
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
import { Languages, LanguageComments } from 'src/app/constants/languages';
import { catchError, takeUntil, tap } from 'rxjs';
import { TuiDestroyService } from '@taiga-ui/cdk';

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
    providers: [TuiDestroyService],
})
export class CodeEditorWindowComponent implements OnInit {
    private readonly taskService = inject(TaskService);
    private readonly destroy$ = inject(TuiDestroyService);
    private readonly cdr = inject(ChangeDetectorRef);

    readonly languages = Object.values(Languages);
    readonly loading = signal(false);

    code = LanguageComments[Languages.Javascript];
    status: string | null = null;
    output: string | null = null;
    error: string | null = null;

    languageControl = new FormControl<Languages>(Languages.Javascript);
    formGroup = new FormGroup({
        language: this.languageControl,
    });

    editorOptions = {
        theme: 'vs-dark',
        language: this.languageControl.value,
        automaticLayout: true,
    };

    ngOnInit() {
        this.languageControl.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((language) => {
                if (language) {
                    this.code = LanguageComments[language];
                    this.editorOptions = { ...this.editorOptions, language };
                }
            });
    }

    runCode() {
        this.loading.set(true);
        this.resetMessages();

        const language = this.languageControl.value;
        const code = this.code;

        if (language) {
            this.executeCode(language, code);
        }
    }

    private resetMessages() {
        this.error = null;
        this.output = null;
    }

    private executeCode(language: Languages, code: string): void {
        this.taskService
            .checkSolution(language, code)
            .pipe(
                tap(({ output, error, status }) => {
                    this.output = output;
                    this.error = error;
                    this.status = status;
                    this.loading.set(false);

                    this.cdr.markForCheck();
                }),
                catchError((err) => {
                    this.error = `Error: ${err.message}`;
                    this.loading.set(false);
                    this.cdr.markForCheck();

                    return [];
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }
}
