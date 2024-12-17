import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'app-code-editor',
    imports: [CommonModule, FormsModule],
    templateUrl: './code-editor.component.html',
    styleUrl: './code-editor.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeEditorComponent {}
