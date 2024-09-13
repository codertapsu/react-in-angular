import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { StoreService } from '@shared/services/store.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class NotificationComponent {
  public readonly storeService = inject(StoreService);

  @Input() public text!: string;

  public updateCounter(): void {
    this.storeService.increment();
  }
}
