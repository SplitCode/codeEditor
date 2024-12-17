import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodeEditorWindowComponent } from './code-editor-window.component';

describe('CodeEditorComponent', () => {
    let component: CodeEditorWindowComponent;
    let fixture: ComponentFixture<CodeEditorWindowComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CodeEditorWindowComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CodeEditorWindowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
