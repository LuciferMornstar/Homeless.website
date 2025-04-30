import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Placeholder for the @noble/web-nfc library
declare global {
    interface Window {
        NDEFReader?: new () => INDEFReader;
    }
}

interface INDEFMessage {
    records: Array<{ data: BufferSource }>;
}

interface INDEFReadingEvent extends Event {
    message: INDEFMessage;
}

interface INDEFReader {
    scan(): Promise<void>;
    onreading: ((event: INDEFReadingEvent) => void) | null;
    onreadingerror: ((event: Event) => void) | null;
}

const NDEFReader: (new () => INDEFReader) | undefined = typeof window !== 'undefined' ? window.NDEFReader : undefined;

const NfcAuthApp: React.FC = () => {
    const [nfcSupported, setNfcSupported] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [mobileChallenge, setMobileChallenge] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || !NDEFReader) {
            setNfcSupported(false);
        }
    }, []);

    const handleNfcAuth = async () => {
        if (!nfcSupported) {
            setError("NFC is not supported on this device.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            if (!NDEFReader) {
                setError("NFC is not supported on this device.");
                setLoading(false);
                return;
            }
            const reader = new NDEFReader();
            await reader.scan();
            reader.onreading = async (event: INDEFReadingEvent) => {
                try {
                    const message = event.message;
                    for (const record of message.records) {
                        const decoder = new TextDecoder();
                        const nfcData = decoder.decode(record.data);
                        const verificationResult = await sendDataToServer(nfcData);
                        if (verificationResult.success) {
                            setIsAuthenticated(true);
                        } else {
                            setError(verificationResult.message || "Authentication failed.  Access denied.");
                        }
                    }
                } catch (e: unknown) {
                    setError(`Error processing NFC data: ${e instanceof Error ? e.message : String(e)}`);
                } finally {
                    setLoading(false);
                }
            };
            reader.onreadingerror = (_event: Event) => {
                setError(`Error reading NFC tag.`);
                setLoading(false);
            };
        } catch (err: unknown) {
            setError(`Error starting NFC scan: ${err instanceof Error ? err.message : String(err)}`);
            setLoading(false);
        }
    };

    const sendDataToServer = async (nfcData: string): Promise<{ success: boolean, message?: string }> => {
        try {
            const response = await fetch("/api/verify-nfc", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nfcData }),
            });
            const result = await response.json();
            return result;
        } catch (error: unknown) {
            return { success: false, message: `Failed to communicate with server: ${error instanceof Error ? error.message : String(error)}` };
        }
    };

    const handleMobileAuth = () => {
        const challenge = "OPERATION_DRAGON_EYE_" + Math.random().toString(36).substring(7);
        setMobileChallenge(challenge);
        setTimeout(() => {
            setIsAuthenticated(true);
            setMobileChallenge(null);
        }, 3000);
    };

    useEffect(() => {
        if (isAuthenticated) {
            // Set flag for HHChan access
            localStorage.setItem('hhchan_member', 'true');
        }
    }, [isAuthenticated]);

    if (isAuthenticated) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1527153372449-a6e4757a5813?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=MPAE1nZhcJTKuMA7VnJdmzJqzhtcbxFHfv5CAjBH6jrA%3D%3D')",
                }}
            >
                <div className="bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/10 text-center">
                    <h1 className="text-3xl font-bold mb-4 text-green-400 tracking-wider">
                        <span role="img" aria-label="shield">🛡️</span> AUTHORIZED ACCESS GRANTED
                    </h1>
                    <p className="text-gray-300 mb-6">
                        Secure connection established. Encrypted data stream initiated.
                    </p>
                    <div className="bg-black/20 p-4 rounded-lg border border-gray-700 mb-6">
                        <p className="text-sm text-gray-400">
                            <span className="font-semibold text-yellow-300">CLASSIFIED:</span>
                            <span> Project Nightingale - Status Active</span>
                        </p>
                    </div>
                    <div className="flex justify-center gap-4">
                        <button
                            className="px-4 py-2 rounded bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 hover:text-white border border-blue-700/50"
                            onClick={() => alert("Navigating to Forum...")}
                        >
                            <span role="img" aria-label="forum">💬</span> Forum
                        </button>
                        <button
                            className="px-4 py-2 rounded bg-green-600/20 text-green-300 hover:bg-green-600/30 hover:text-white border border-green-700/50"
                            onClick={() => alert("Navigating to File Repository...")}
                        >
                            <span role="img" aria-label="folder">📁</span> Repository
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1507842217276-8f111c13414f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=MPAE1nZhcJTKuMA7VnJdmzJqzhtcbxFHfv5CAjBH6jrA%3D%3D')",
            }}
        >
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/10 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-red-400 tracking-wider">
                    <span role="img" aria-label="shield">🛡️</span> ACCESS RESTRICTED
                </h1>
                {error && (
                    <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded">
                        <strong>Security Alert:</strong> {error}
                    </div>
                )}
                {nfcSupported ? (
                    <button
                        onClick={handleNfcAuth}
                        className="w-full mb-4 px-4 py-2 rounded bg-blue-600/90 text-white hover:bg-blue-700/90 shadow-lg hover:shadow-blue-500/50 transition-all duration-300 border border-blue-700/50"
                        disabled={loading}
                    >
                        <span role="img" aria-label="nfc">📶</span> {loading ? 'Authenticating...' : 'Authorize via NFC'}
                    </button>
                ) : (
                    <p className="text-gray-400 mb-4 text-center">
                        Device Incompatible. Use alternate protocol.
                    </p>
                )}
                <button
                    onClick={handleMobileAuth}
                    className="w-full px-4 py-2 rounded bg-yellow-600/90 text-gray-900 hover:bg-yellow-700/90 shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 border border-yellow-700/50"
                    disabled={loading}
                >
                    <span role="img" aria-label="fingerprint">🔑</span> {loading ? 'Authenticating...' : 'Mobile Verification'}
                </button>
                {mobileChallenge && (
                    <div className="mt-4 p-4 bg-black/20 rounded-lg border border-gray-700">
                        <p className="text-sm text-gray-400">
                            <span className="font-semibold text-yellow-300">CHALLENGE CODE:</span>
                            <span className="font-mono text-white ml-2">{mobileChallenge}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            <span className="font-semibold text-yellow-300">INSTRUCTIONS:</span>
                            <span> Use secure mobile app to transmit signature.</span>
                        </p>
                    </div>
                )}
            </div>
            <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                    <span className="font-semibold text-red-400">WARNING:</span>
                    <span> Unauthorized access is a federal offense. All activity is logged.</span>
                </p>
            </div>
        </motion.div>
    );
};

export default NfcAuthApp;

