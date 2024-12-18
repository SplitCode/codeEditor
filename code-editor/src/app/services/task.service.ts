import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Task } from '../models/task-interface';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private apiUrl = 'http://localhost:3000/tasks';
    private readonly http = inject(HttpClient);

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.apiUrl).pipe(
            catchError((err) => {
                console.error('Failed to load tasks', err);
                return of([]);
            })
        );
    }

    checkSolution(
        language: string,
        code: string
    ): Observable<{ output: string; error: string | null; status: string }> {
        return this.getTasks().pipe(
            map((tasks) => {
                const task = tasks.find((t) => t.solutions[language]);
                if (!task) {
                    return {
                        output: '',
                        error: 'Language not supported for this task',
                        status: 'error',
                    };
                }

                const solution = task.solutions[language];
                if (solution.code === code) {
                    return {
                        status: solution.successResponse.status,
                        output: solution.successResponse.output,
                        error: null,
                    };
                } else {
                    return {
                        status: solution.errorResponse.status,
                        output: '',
                        error: solution.errorResponse.error,
                    };
                }
            })
        );
    }
}
