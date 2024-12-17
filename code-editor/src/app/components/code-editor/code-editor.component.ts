import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnChanges,
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
import { LANGUAGES } from '../../constants/languages';

@Component({
    standalone: true,
    selector: 'app-code-editor',
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
    templateUrl: './code-editor.component.html',
    styleUrl: './code-editor.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeEditorComponent implements OnChanges {
    code = '// Write your code here!';
    output = '';

    languageControl = new FormControl(LANGUAGES.javascript);
    formGroup = new FormGroup({
        language: this.languageControl,
    });

    editorOptions = {
        theme: 'vs-dark',
        language: this.languageControl.value,
    };

    private readonly http = inject(HttpClient);
    readonly languages = Object.values(LANGUAGES);

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
