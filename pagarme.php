<?php

if($_GET['type'] == 'get'){
    getOrder($_GET['order']);
}
if($_GET['type'] == 'pay'){
    getPay($_GET['nome'], $_GET['dia'], $_GET['turno'], $_GET['tour'], $_GET['quantidade'], $_GET['valor'] . '00');
}

function getOrder($order){
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => "https://api.pagar.me/core/v5/orders/".$order,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => [
            "accept: application/json",
            "authorization: Basic c2tfNzI0YWNlYzkzNTJlNDczYjllMDc5NjNlMjcxMmEwYjE6"
        ],
    ]);
    $response = curl_exec($curl);
    curl_close($curl);
    echo $response;
}

function getPay($nome, $dia, $turno, $tour, $quantidade, $valor){
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => "https://api.pagar.me/core/v5/orders",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => json_encode([
            'customer' => [
                'name' => $nome
            ],
            'items' => [
                [
                    'quantity' => $quantidade,
                    'description' => $dia . ' - ' . $turno . ' - ' . $tour,
                    'amount' => $valor
                ]
            ],
            'payments' => [
                [
                    'checkout' => [
                        'expires_in' => (60 * 24 * 2),
                        'default_payment_method' => 'credit_card',
                        'accepted_payment_methods' => [
                            'credit_card', 'pix'
                        ],
                        'pix' => [
                            'expires_in' => (60 * 60 * 24 * 2)
                        ]
                    ],
                    'payment_method' => 'checkout',
                ]
            ]
        ]),
        CURLOPT_HTTPHEADER => [
            "accept: application/json",
            "authorization: Basic c2tfNzI0YWNlYzkzNTJlNDczYjllMDc5NjNlMjcxMmEwYjE6",
            "content-type: application/json"
        ],
    ]);
    $response = curl_exec($curl);
    curl_close($curl);
    echo $response;
}