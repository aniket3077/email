import { NextRequest, NextResponse } from 'next/server';

// Mock email sending function
const sendEmail = async (
  name: string, 
  email: string, 
  subject: string, 
  message: string
): Promise<{ success: boolean; error?: string }> => {
  // Simulate email sending with a random success/failure
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Randomly fail 10% of the time for demonstration purposes
  if (Math.random() < 0.1) {
    return { 
      success: false,
      error: "Failed to send email. Please try again later."
    };
  }
  
  // Log the email details (in a real app, this would send an actual email)
  console.log('Email sent:', {
    to: 'support@sphurti.com',
    from: email,
    subject: subject || `Contact request from ${name}`,
    name,
    message
  });
  
  return { success: true };
};

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { name, email, subject, message } = body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    // Send the email
    const result = await sendEmail(name, email, subject, message);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send message' },
        { status: 500 }
      );
    }
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully!'
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
} 