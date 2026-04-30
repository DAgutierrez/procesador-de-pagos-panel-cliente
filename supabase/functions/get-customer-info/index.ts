// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
console.info("get-customer-products function initialized");

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders(),
    });
  }

  try {
    const { customer_id } = await req.json();

    if (!customer_id) {
      return jsonResponse({ error: "Debe enviar customer_id" });
    }

   const supabaseClient = createClient(
      // URL y KEY provistas por Supabase Runtime
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
    );

    const { data: customer, errorCustomer } = await supabaseClient
      .from("customers")
      .select("*")
      .eq("id", customer_id)
      .single();

    // Buscar productos del customer
    const { data: customerProducts, error } = await supabaseClient
      .from("customer_products")
      .select("*")
      .eq("customer_id", customer_id);


    if (error) {
      console.error("Supabase error:", error);
      return jsonResponse({ error: "Error al obtener productos" });
    }

    if (!customerProducts || customerProducts.length === 0) {
      return jsonResponse({ message: "No existen productos para este cliente" });
    }

    const { data: paymentMethod, error: paymentError } = await supabaseClient
  .from("payment_methods")
  .select("card_number, card_brand")
  .eq("customer_id", customer_id)
  .is("deleted_at", null)
  .order("created_at", { ascending: false })
  .limit(1)
  .maybeSingle();

  console.log(paymentMethod)

  if (paymentError) {
    console.log(paymentError)
  return jsonResponse({ message: "Error en paymentError" });
  }

  const result = customerProducts.map((product) => ({
  ...product,
  payment_method: paymentMethod ?? null,
}));


    return jsonResponse({ customer: customer, customer_products: result });
  } catch (e) {
    console.error("Server error:", e);
    return jsonResponse({ error: "Error interno" });
  }
});

/* ---------------------- Helpers -------------------------- */

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

function jsonResponse(data: object) {
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(),
    },
  });
}
