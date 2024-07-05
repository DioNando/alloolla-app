<?php

namespace App\Filters;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class ProductsFilter extends ApiFilter
{
    protected $safeParms = [
        'customerId' => ['eq'],
        'amount' => ['eq', 'lt', 'gt', 'lte', 'gte'],
        'status' => ['eq', 'ne'],
    ];

    protected $columnMap = [
        // 'userId' => 'user_id',
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '=',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=',
        'ne' => '!='
    ];
}
