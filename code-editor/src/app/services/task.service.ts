import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Task } from '../models/task-interface';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private apiUrl = 'http://localhost:3000/tasks';

    private http = inject(HttpClient);

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.apiUrl);
    }

    getTaskById(id: number): Observable<Task> {
        return this.http.get<Task>(`${this.apiUrl}/${id}`);
    }

    runCode(
        language: string,
        code: string
    ): Observable<{ output: string; error: string | null }> {
        return this.getTasks().pipe(
            map((tasks) => {
                const task = tasks.find((t) => t.solutions[language]);
                if (!task) {
                    return {
                        output: '',
                        error: 'Language not supported for this task',
                    };
                }

                const solution = task.solutions[language];
                if (solution.code === code) {
                    return {
                        output: solution.successResponse.output,
                        error: null,
                    };
                } else {
                    return { output: '', error: solution.errorResponse.error };
                }
            })
        );
    }
}
