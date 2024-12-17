import {
    ChangeDetectionStrategy,
    Component,
    // inject,
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
// import { HttpClient } from '@angular/common/http';
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
    code = 'function x() {\nconsole.log("Hello world!");\n}';
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

    // private readonly http = inject(HttpClient);
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
            const mockResponse = this.mockServerResponse(language, code);

            if (mockResponse) {
                if (mockResponse.status === 'success') {
                    this.output = mockResponse.output || null;
                } else if (
                    mockResponse.status === 'error' &&
                    'error' in mockResponse
                ) {
                    this.error = mockResponse.error;
                }
            } else {
                this.error = 'Произошла ошибка при выполнении запроса.';
            }
        }
    }

    mockServerResponse(language: 'javascript' | 'python', code: string) {
        const responses = {
            javascript: [
                {
                    code: "console.log('Hello, world!');",
                    status: 'success',
                    output: 'Hello, world!\n',
                },
                {
                    code: "console.log(Hello world!');",
                    status: 'error',
                    error: 'SyntaxError: Unexpected token',
                },
            ],
            python: [
                {
                    code: "print('Hello, Python world!')",
                    status: 'success',
                    output: 'Hello, Python world!\n',
                },
            ],
        };

        if (responses[language]) {
            const response = responses[language].find(
                (item) => item.code === code
            );
            return response;
        }

        return null;
    }
}
