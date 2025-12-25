import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# If you want to run the backend without a Supabase project for quick local testing,
# set DEV_NO_SUPABASE=1 in your environment. That will use an in-memory mock client.
DEV_NO_SUPABASE = os.getenv("DEV_NO_SUPABASE") == "1"

if DEV_NO_SUPABASE:
    import uuid
    from types import SimpleNamespace

    class ExecResult(SimpleNamespace):
        def __init__(self, data=None, error=None):
            super().__init__(data=data or [], error=error)

    class TableMock:
        def __init__(self, table_name, storage):
            self.table_name = table_name
            self.storage = storage
            self._filters = []

        def insert(self, data):
            # accept dict or list
            rows = data if isinstance(data, list) else [data]
            out = []
            for r in rows:
                row = dict(r)
                if 'id' not in row:
                    row['id'] = str(uuid.uuid4())
                self.storage[self.table_name].append(row)
                out.append(row)
            return ExecResult(data=out)

        def select(self, _cols='*'):
            # reset filters
            self._filters = []
            return self

        def eq(self, column, value):
            self._filters.append((column, value))
            return self

        def order(self, _col, desc=False):
            # store ordering choice
            self._order = (_col, desc)
            return self

        def execute(self):
            rows = list(self.storage[self.table_name])
            for fcol, fval in getattr(self, '_filters', []):
                rows = [r for r in rows if str(r.get(fcol)) == str(fval)]
            # ordering
            if hasattr(self, '_order'):
                col, desc = self._order
                rows.sort(key=lambda r: r.get(col), reverse=desc)
            return ExecResult(data=rows)

    class MockSupabase:
        def __init__(self):
            self._storage = {
                'bookings': [],
                'invoices': [],
                'notifications': [],
            }

        def table(self, name):
            if name not in self._storage:
                self._storage[name] = []
            return TableMock(name, self._storage)

    supabase = MockSupabase()
else:
    from supabase import create_client

    if not SUPABASE_URL or not SUPABASE_KEY:
        raise RuntimeError("Please set SUPABASE_URL and SUPABASE_KEY in environment")

    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

