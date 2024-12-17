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
import { LANGUAGES } from '../../../constants/languages';

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
    output = '';

    languageControl = new FormControl(LANGUAGES.javascript);
    formGroup = new FormGroup({
        language: this.languageControl,
    });

    editorOptions = {
        theme: 'vs-dark',
        language: this.languageControl.value,
        automaticLayout: true,
    };

    private readonly http = inject(HttpClient);
    readonly languages = Object.values(LANGUAGES);

    // onInit(editor: { getPosition: () => any }) {
    //     const line = editor.getPosition();
    //     console.log(line);
    // }

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

        const language = this.languageControl.value;
        const code = this.code;

        this.http
            .post('http://localhost:3001/api/run-code', { language, code })
            .subscribe({
                next: (response: any) => (this.output = response.output),
                error: (error) => console.error(error),
            });
    }
}
