import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Mail, ArrowRight } from 'lucide-react';
import { client } from '../../api/client';

export default function VerifyEmailPage() {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Get email from location state (passed from RegisterPage)
    const email = location.state?.email;

    if (!email) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <h2 className="text-xl font-bold">Error</h2>
                    <p className="text-muted-foreground">No email found. Please register first.</p>
                    <Button onClick={() => navigate('/register')} className="mt-4">
                        Go to Register
                    </Button>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await client.post('/auth/verify-email', { email, code });
            // Success
            navigate('/login', { state: { message: 'Email verified! Please login.' } });
        } catch (err: any) {
            setError(err.response?.data?.error || 'Verification failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-lg border shadow-sm">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                        <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">Verify your email</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        We sent a verification code to <strong>{email}</strong>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Verification Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="123456"
                        required
                        className="text-center text-lg tracking-widest"
                    />

                    {error && (
                        <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                        Verify Email
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <div className="text-center">
                        <span className="text-sm text-muted-foreground">Didnt receive code? </span>
                        <button type="button" className="text-sm font-medium text-primary hover:underline">Resend</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
