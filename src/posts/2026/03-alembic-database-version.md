---
title: "The power (and necessity) of versioning your databases"
date: "2026-04-14"
description: "How Alembic, Flyway, and similar tools help teams manage schema changes safely."
tags: [database, python, migration, devops]
---

## Introduction

If your application code is versioned but your database is not 🤔, you are carrying hidden risk.

At first, database changes feel simple:

- add one column
- rename a table
- ...

Then reality is different:

- teammates make changes in parallel
- multiple environments (local, staging, production)
- database rollback is unclear when something goes wrong

## What Is Database Versioning?

Database versioning is the practice of managing schema changes as ordered migration files stored in your code repository.

Instead of manually editing the database, you run migrations through tooling so every environment can move from version `n` to version `n+1` in a predictable way.

**Think of it as Git for schema evolution. ♥️**

## Why It Matters

Without a migration framework, teams often face:

- drift between environments
- undocumented SQL changes
- **painful hotfixes in production 😟**

Sometimes you do not even know what have changed from one commit to another 🚩

## Alembic (Python / SQLAlchemy)

Alembic is the main migration tool for SQLAlchemy projects.

### Core Ideas

- migration scripts live in a `versions/` directory
- each migration has a revision ID and dependency chain
- supports `upgrade()` and `downgrade()` functions (to change among versions)

### Typical Workflow

1. Update SQLAlchemy models.
2. Generate migration:

```bash
alembic revision --autogenerate -m "add users table"
```

3. Review and adjust generated SQL/operations.
4. Apply migration:

```bash
alembic upgrade head
```

5. Rollback last verison

```bash
alembic downgrade -1
```

Personally, I have used this last two commands many times today :). History can also be shown with `alembic history`:

```
20260405_0001 -> 20260414_0001 (head), Initial data load
<base> -> 20260405_0001, Initial schema
```

## Flyway (Polyglot, SQL-First)

Flyway is a language-agnostic migration tool widely used in JVM and enterprise environments, but it works well with many stacks.

### Core Ideas

- migrations are usually plain SQL files
- naming convention controls order, for example:
  - `V1__init.sql`
  - `V2__add_index.sql`
  - In my last job, we had many many scripts per version... Impossible to manage without flyway
- metadata table tracks which migrations ran

### Typical Workflow

1. Create a new SQL migration file.
2. Commit it with application code.
3. Run:

```bash
flyway migrate
```

## How These Tools Actually Keep Order

Most tools rely on a schema history table in the database. Each applied migration is recorded with metadata such as: version or revision ID, execution timestamp, success/failure state...

On each run, the tool compares migration files in your repo with the history table and executes only pending versions in the correct order.

## Conclusion

Database versioning is not optional once your project grows beyond one developer and one environment Alembic, Flyway, and similar frameworks solve this problem as they turn fragile, manual schema changes into reliable, automatable release steps.

Even though with AI Models everything is much easier, it is important to be aware of these systems' features and know how and when we can use them.

**If you already version your application code, version your database with the same rigor. 📝**

