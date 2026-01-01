
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-6 text-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Упс! Что-то пошло не так.</h1>
            <p className="text-slate-400 mb-8">Мы уже работаем над исправлением.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 rounded-xl font-bold"
            >
              Обновить страницу
            </button>
          </div>
        </div>
      );
    }

    // Fix: access children from props
    return this.props.children;
  }
}
