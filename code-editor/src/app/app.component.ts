import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TUI_SANITIZER,
} from '@taiga-ui/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CodeEditorComponent } from './code-editor/code-editor.component';

@Component({
    imports: [
        CodeEditorComponent,
        RouterModule,
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
    ],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    title = 'code-editor';
}
