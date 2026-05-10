import React from 'react';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-base-900 p-6">
          <div className="glass rounded-3xl p-8 max-w-md w-full text-center border border-red-500/20 glow-orange">
            <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="font-display text-2xl font-bold mb-3 text-white">Something went wrong</h1>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              We encountered an unexpected error. Don't worry, your data is safe. Please try refreshing the page.
            </p>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={() => window.location.reload()}
                className="btn-brand w-full flex items-center justify-center gap-2"
              >
                <RefreshCcw className="w-4 h-4" />
                Refresh Page
              </button>
              <a
                href="/"
                className="btn-outline w-full flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Go to Home
              </a>
            </div>
            
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 text-left p-4 rounded-xl bg-red-500/5 border border-red-500/10 overflow-auto">
                <p className="text-[10px] font-mono text-red-400/80">
                  {this.state.error && this.state.error.toString()}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
