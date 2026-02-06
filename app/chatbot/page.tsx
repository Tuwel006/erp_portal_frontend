'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    TextField,
    IconButton,
    Avatar,
    alpha,
    Paper,
    Chip,
    Divider
} from '@mui/material';
import {
    Send,
    Mic,
    Bot,
    Sparkles,
    Command
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface Message {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
}

export default function ChatbotPage() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Hello! I am your ERP Assistant. How can I help you today?', sender: 'bot', timestamp: new Date() },
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user', timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        setTimeout(() => {
            let botText = "I'm not sure about that. Try asking 'Aaj ka sales?' or 'Low stock dikhao'.";
            if (input.toLowerCase().includes('sales')) {
                botText = "Today's total sales count is 42 with a value of ₹1,24,500.";
            } else if (input.toLowerCase().includes('stock')) {
                botText = "There are 12 items currently below their minimum stock level.";
            }

            const botMsg: Message = { id: (Date.now() + 1).toString(), text: botText, sender: 'bot', timestamp: new Date() };
            setMessages(prev => [...prev, botMsg]);
        }, 1000);
    };

    return (
        <DashboardLayout>
            <Box sx={{ mb: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>AI ERP Assistant</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Business intelligence via natural language.
                    </Typography>
                </Box>
                <Chip
                    icon={<Sparkles size={12} />}
                    label="AI Active"
                    color="secondary"
                    variant="outlined"
                    sx={{ fontWeight: 700, fontSize: '0.65rem' }}
                />
            </Box>

            <Card sx={{ height: 'calc(100vh - 250px)', display: 'flex', flexDirection: 'column' }}>
                <Box
                    sx={{
                        p: 1.5,
                        px: 2,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        bgcolor: alpha('#6366f1', 0.02)
                    }}
                >
                    <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                        <Bot size={18} />
                    </Avatar>
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>Prime Bot</Typography>
                        <Typography variant="caption" color="success.main" sx={{ fontWeight: 700 }}>ONLINE</Typography>
                    </Box>
                </Box>

                <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {messages.map((msg) => (
                        <Box
                            key={msg.id}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                            }}
                        >
                            <Box
                                sx={{
                                    maxWidth: '80%',
                                    p: 1.25,
                                    px: 2,
                                    borderRadius: 1,
                                    bgcolor: msg.sender === 'user' ? 'secondary.main' : alpha('#f1f5f9', 0.8),
                                    color: msg.sender === 'user' ? 'white' : 'text.primary',
                                    border: msg.sender === 'bot' ? '1px solid' : 'none',
                                    borderColor: 'divider'
                                }}
                            >
                                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{msg.text}</Typography>
                            </Box>
                            <Typography variant="caption" sx={{ mt: 0.25, color: 'text.secondary', fontSize: '0.6rem' }}>
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                        </Box>
                    ))}
                    <div ref={messagesEndRef} />
                </Box>

                <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5, flexWrap: 'wrap' }}>
                        {["Aaj ka sales?", "Low stock?", "Invoices", "GST"].map((suggestion) => (
                            <Chip
                                key={suggestion}
                                label={suggestion}
                                onClick={() => setInput(suggestion)}
                                size="small"
                                sx={{ fontSize: '0.65rem', cursor: 'pointer' }}
                            />
                        ))}
                    </Box>
                    <Paper
                        elevation={0}
                        sx={{
                            p: '2px 8px',
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: alpha('#f1f5f9', 0.5),
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'divider'
                        }}
                    >
                        <TextField
                            fullWidth
                            placeholder="Ask prime assistant..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                            sx={{ ml: 1, flex: 1, '& .MuiInputBase-input': { fontSize: '0.8rem' } }}
                        />
                        <IconButton size="small" onClick={handleSend} color="secondary">
                            <Send size={16} />
                        </IconButton>
                        <Divider sx={{ height: 20, m: 1 }} orientation="vertical" />
                        <IconButton size="small" color="primary">
                            <Mic size={16} />
                        </IconButton>
                    </Paper>
                </Box>
            </Card>
        </DashboardLayout>
    );
}
