import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
    standalone: true,
    selector: 'app-code-editor',
    imports: [CommonModule, FormsModule, MonacoEditorModule, TuiButtonModule],
    templateUrl: './code-editor.component.html',
    styleUrl: './code-editor.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeEditorComponent {
    language = 'javascript';
    code = '// Write your code here!';
    output = '';
    editorOptions = { theme: 'vs-dark', language: this.language };

    runCode() {
        console.log('run');
    }
}
