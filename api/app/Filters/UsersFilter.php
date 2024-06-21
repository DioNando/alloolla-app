<?php

namespace App\Filters;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class UsersFilter extends ApiFilter
{
    protected $safeParms = [
        'isActive' => ['eq', 'ne'],
        'isAdmin' => ['eq', 'ne'],
    ];

    protected $columnMap = [
        'isAdmin' => 'is_admin',
        'isActive' => 'is_active',
    ];

    protected $operatorMap = [
        'eq' => '=',
        'ne' => '!='
    ];
}
