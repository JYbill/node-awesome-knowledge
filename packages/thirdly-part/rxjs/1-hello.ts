import { interval } from "rxjs";
import { take } from "rxjs/operators";

interval(500).pipe(take(10)).subscribe(console.log);
