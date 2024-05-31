import { Component, Input, AfterViewInit, OnInit } from '@angular/core';

declare var paypal: any;

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css']
})
export class PaypalButtonComponent implements AfterViewInit, OnInit {
  @Input() product!: { id: number, name: string, price: number };

  ngOnInit(): void {
    this.loadPaypalScript().then(() => {
      this.renderPaypalButton();
    }).catch((err) => {
      console.error('PayPal SDK no está disponible.', err);
    });
  }

  ngAfterViewInit(): void {
    // Deja este método vacío, ya que la lógica se ha movido a ngOnInit
  }

  private loadPaypalScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof paypal !== 'undefined') {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=Ad31QvmzfYdxgykeqym2M_k8wFl9Fsjg1WB_HrCkS-ku53YmvX-i3zZDLftKn9jUdVEbKEJD1xtlZlTI';
      script.onload = () => {
        resolve();
      };
      script.onerror = (error) => {
        reject(error);
      };
      document.body.appendChild(script);
    });
  }

  private renderPaypalButton(): void {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.product.price.toFixed(2) // Precio del producto seleccionado
            },
            description: this.product.name // Descripción del producto
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert('Transaction completed by ' + details.payer.name.given_name);
        });
      },
      onError: (err: any) => {
        console.error('An error occurred during the transaction', err);
      }
    }).render('#paypal-button-container');
  }
}
