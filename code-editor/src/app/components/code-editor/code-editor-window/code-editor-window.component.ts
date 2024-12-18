import {
    ChangeDetectionStrategy,
    Component,
    inject,
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
import { HttpClient } from '@angular/common/http';
// import { LANGUAGES } from '../../../constants/languages';

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
export class CodeEditorWindowComponent implements OnChanges, OnInit {
    code = '';
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

    constructor(private http: HttpClient) {}
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
        console.log('run');

        this.error = null;
        this.output = null;

        const language = this.languageControl.value;
        const code = this.code;

        if (language && typeof language === 'string') {
            const response = this.mockServerResponse(language, code);

            if (response) {
                if (response.status === 'success') {
                    this.output = response.output || 'Нет вывода.';
                } else if (response.status === 'error') {
                    this.error = response.error || 'Неизвестная ошибка.';
                }
            } else {
                this.error = 'Не удалось обработать запрос.';
            }
        }
    }

    mockServerResponse(language: 'javascript' | 'python', code: string) {
        if (language === 'javascript') {
            try {
                let capturedOutput = ''; // Переменная для хранения вывода
                const originalConsoleLog = console.log; // Сохраняем оригинальный console.log

                // Переопределяем console.log
                console.log = (...args: unknown[]) => {
                    capturedOutput += args.join(' ') + '\n';
                    originalConsoleLog(...args); // Вызываем оригинальный console.log для вывода в консоль
                };

                const result = eval(code); // Выполняем код

                console.log = originalConsoleLog; // Восстанавливаем оригинальный console.log

                return {
                    status: 'success',
                    output:
                        capturedOutput ||
                        (result !== undefined ? String(result) : ''),
                };
            } catch (error) {
                // console.log = console.log; // Восстанавливаем originalConsoleLog в случае ошибки
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : 'Неизвестная ошибка';
                return {
                    status: 'error',
                    error: errorMessage,
                };
            }
        }

        if (language === 'python') {
            if (code.startsWith('print(')) {
                return {
                    status: 'success',
                    output: code.match(/print\(['"](.+)['"]\)/)?.[1] + '\n',
                };
            } else {
                return {
                    status: 'error',
                    error: 'SyntaxError: Недопустимый Python код',
                };
            }
        }

        return null;
    }
}
