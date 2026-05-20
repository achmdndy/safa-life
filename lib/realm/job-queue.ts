let chain: Promise<void> = Promise.resolve();

type RealmJobStatus = "pending" | "in_progress" | "completed" | "failed";

export type RealmJob = {
  id: string;
  description: string;
  createdAt: number;
  startedAt?: number;
  finishedAt?: number;
  status: RealmJobStatus;
  error?: string;
};

const jobs: RealmJob[] = [];

function generateJobId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getRealmJobList(): ReadonlyArray<RealmJob> {
  return jobs;
}

export function clearRealmJobs(): void {
  jobs.length = 0;
}

export function scheduleRealmJob<T = void>(description: string, fn: () => T | Promise<T>): Promise<T> {
  const job: RealmJob = {
    id: generateJobId(),
    description,
    createdAt: Date.now(),
    status: "pending",
  };
  jobs.push(job);

  const next = chain.then(async () => {
    job.status = "in_progress";
    job.startedAt = Date.now();
    try {
      const result = await fn();
      job.status = "completed";
      job.finishedAt = Date.now();
      return result as T;
    } catch (err) {
      job.status = "failed";
      job.finishedAt = Date.now();
      job.error = err instanceof Error ? err.message : String(err);
      throw err;
    }
  });

  // Ensure subsequent calls wait for this one (even if it throws)
  chain = next.then(() => void 0).catch(() => void 0);
  return next as Promise<T>;
}

/**
 * Backward-compatible API to serialize Realm writes without metadata.
 */
export function scheduleRealmWrite<T = void>(fn: () => T | Promise<T>): Promise<T> {
  return scheduleRealmJob("realm-write", fn);
}