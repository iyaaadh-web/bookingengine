import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isPlaceholder = !supabaseUrl || !supabaseAnonKey ||
    supabaseUrl.includes('placeholder') ||
    supabaseAnonKey.includes('placeholder')

export const supabase = isPlaceholder
    ? {
        auth: {
            signInWithPassword: async ({ email, password }) => {
                console.log('Mock login attempt for:', email);
                // Allow any login for mock purposes
                if (email && password) {
                    const user = { id: 'mock-user-id', email, role: 'authenticated' };
                    const session = { user, access_token: 'mock-token', expires_in: 3600 };
                    return { data: { user, session }, error: null };
                }
                return { data: null, error: { message: 'Invalid mock credentials' } };
            },
            signOut: async () => ({ error: null }),
            getSession: async () => {
                const sessionStr = localStorage.getItem('mock_session');
                const session = sessionStr ? JSON.parse(sessionStr) : null;
                return { data: { session }, error: null };
            },
            onAuthStateChange: (callback) => {
                const sessionStr = localStorage.getItem('mock_session');
                const session = sessionStr ? JSON.parse(sessionStr) : null;
                setTimeout(() => callback('SIGNED_IN', session), 0);
                return { data: { subscription: { unsubscribe: () => { } } } };
            },
            getUser: async () => {
                const sessionStr = localStorage.getItem('mock_session');
                const user = sessionStr ? JSON.parse(sessionStr).user : null;
                return { data: { user }, error: null };
            }
        },
        from: (table) => ({
            select: (cols = '*') => ({
                eq: (col, val) => ({
                    single: async () => ({ data: null, error: null }),
                    execute: async () => ({ data: [], error: null }),
                    order: () => ({ execute: async () => ({ data: [], error: null }) })
                }),
                order: (col, { ascending = true } = {}) => ({
                    limit: (n) => ({ execute: async () => ({ data: [], error: null }) }),
                    execute: async () => ({ data: [], error: null })
                }),
                limit: (n) => ({ execute: async () => ({ data: [], error: null }) }),
                execute: async () => ({ data: [], error: null }),
                range: () => ({ execute: async () => ({ data: [], error: null }) })
            }),
            insert: (data) => ({
                select: () => ({ execute: async () => ({ data: [data], error: null }) }),
                execute: async () => ({ data: [data], error: null })
            }),
            update: (data) => ({
                eq: (col, val) => ({ execute: async () => ({ data: [data], error: null }) }),
                execute: async () => ({ data: [data], error: null })
            }),
            delete: () => ({
                eq: (col, val) => ({ execute: async () => ({ data: [], error: null }) }),
                execute: async () => ({ data: [], error: null })
            })
        }),
        storage: {
            from: () => ({
                getPublicUrl: (path) => ({ data: { publicUrl: '' } }),
                upload: async () => ({ data: {}, error: null })
            })
        }
    }
    : createClient(supabaseUrl, supabaseAnonKey)
