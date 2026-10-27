import { Service, signal } from '@angular/core';

import type { Launch } from './launch.model';
import { MOCK_LAUNCHES } from './launch.model';

// Not root-provided: scoped via route providers (equivalent: @Injectable())
@Service({ autoProvided: false })
export class LaunchStore {
  readonly launches = signal<Launch[]>(MOCK_LAUNCHES);
}
