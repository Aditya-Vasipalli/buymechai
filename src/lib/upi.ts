import QRCode from 'qrcode';

export interface UPIPaymentParams {
  upiId: string;
  amount: number; // Amount in rupees
  merchantName: string;
  transactionNote?: string;
  transactionRef?: string;
}

export class UPIService {
  /**
   * Generate UPI payment URL
   */
  static generateUPIUrl(params: UPIPaymentParams): string {
    const { upiId, amount, merchantName, transactionNote, transactionRef } = params;
    
    const upiUrl = new URL('upi://pay');
    upiUrl.searchParams.set('pa', upiId);
    upiUrl.searchParams.set('am', amount.toString());
    upiUrl.searchParams.set('pn', merchantName);
    
    if (transactionNote) {
      upiUrl.searchParams.set('tn', transactionNote);
    }
    
    if (transactionRef) {
      upiUrl.searchParams.set('tr', transactionRef);
    }
    
    upiUrl.searchParams.set('cu', 'INR');
    
    return upiUrl.toString();
  }

  /**
   * Generate QR code for UPI payment
   */
  static async generateQRCode(params: UPIPaymentParams): Promise<string> {
    const upiUrl = this.generateUPIUrl(params);
    
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(upiUrl, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      
      return qrCodeDataUrl;
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw new Error('Failed to generate QR code');
    }
  }

  /**
   * Check if device is mobile
   */
  static isMobile(): boolean {
    if (typeof window === 'undefined') return false;
    
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  /**
   * Initiate UPI payment
   * - On mobile: Opens UPI app
   * - On desktop: Returns QR code data URL
   */
  static async initiatePayment(params: UPIPaymentParams): Promise<{
    type: 'redirect' | 'qr';
    data: string;
  }> {
    const isMobile = this.isMobile();
    
    if (isMobile) {
      const upiUrl = this.generateUPIUrl(params);
      return {
        type: 'redirect',
        data: upiUrl
      };
    } else {
      const qrCode = await this.generateQRCode(params);
      return {
        type: 'qr',
        data: qrCode
      };
    }
  }

  /**
   * Get popular UPI apps for fallback
   */
  static getUPIApps() {
    return [
      {
        name: 'Google Pay',
        packageName: 'com.google.android.apps.nbu.paisa.user',
        scheme: 'gpay'
      },
      {
        name: 'PhonePe',
        packageName: 'com.phonepe.app',
        scheme: 'phonepe'
      },
      {
        name: 'Paytm',
        packageName: 'net.one97.paytm',
        scheme: 'paytm'
      },
      {
        name: 'BHIM',
        packageName: 'in.org.npci.upiapp',
        scheme: 'bhim'
      }
    ];
  }

  /**
   * Generate app-specific UPI URLs
   */
  static generateAppSpecificUrls(params: UPIPaymentParams): Record<string, string> {
    const baseUpiUrl = this.generateUPIUrl(params);
    const apps = this.getUPIApps();
    
    const urls: Record<string, string> = {};
    
    apps.forEach(app => {
      // For most UPI apps, the standard upi:// scheme works
      urls[app.name] = baseUpiUrl;
    });
    
    return urls;
  }

  /**
   * Format currency for display
   */
  static formatCurrency(amountInPaise: number): string {
    const rupees = amountInPaise / 100;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(rupees);
  }

  /**
   * Convert rupees to paise
   */
  static rupeesToPaise(rupees: number): number {
    return Math.round(rupees * 100);
  }

  /**
   * Convert paise to rupees
   */
  static paiseToRupees(paise: number): number {
    return paise / 100;
  }
}