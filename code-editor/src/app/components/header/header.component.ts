import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiMarkerIconModule } from '@taiga-ui/kit';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, TuiMarkerIconModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
