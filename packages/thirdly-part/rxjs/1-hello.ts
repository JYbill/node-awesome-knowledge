import {first, interval, map, of} from "rxjs";
import {take} from "rxjs/operators";

interval(500).pipe(take(10)).subscribe(console.log);

// 1. map操作符
/*of(1, 2, 3)
    .pipe(
        map((data) => {
            return data ** 2;
        })
    )
    .subscribe((data) => {
        console.log(data);
    })*/
/*
* result:
*   1 4 9
* */

// 2. first
/*of(1, 2, 3)
    .pipe(first())
    .subscribe((data) => {
        console.log("res", data);
    })*/
// res 1
